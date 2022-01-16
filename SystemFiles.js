const fs =require("fs")
const path =require("path")
const nodeDiskInfo = require('node-disk-info');

class SystemFiles {

    listarArquivos(base) {
        var mapeamento = [];        
        var pastas = fs.readdirSync(base);
        var ite = 0;

        for(let p in pastas) {
            try{

                var caminho = path.join(base, pastas[p]);
                var stats = fs.lstatSync(caminho);

                //Filtro especifico...
                if(path.basename(caminho).startsWith('.') || path.basename(caminho).startsWith('$')){
                    continue
                }                

                if(stats.isDirectory()) {
                    mapeamento.push({
                        id:ite,
                        name: path.basename(caminho),
                        path: caminho,
                        children: []
                    });
                    ite ++;
                } else {     
                    if(path.extname(caminho) == '.blf'|| path.extname(caminho) == '.regtrans-ms' ||
                    path.extname(caminho) == '.DAT' || path.extname(caminho) == ""){
                        continue
                    }                                   
                    mapeamento.push({
                        id: ite,
                        name: path.basename(caminho),
                        path: caminho,
                        extension: path.extname(caminho),                        
                    });
                    ite ++;
                }

            }catch(error){}
        }

        mapeamento.sort((a,b)=>{
            if(a.children && !b.children){
                return -1;
            } else if (!a.children && b.children){
                return 1;
            }else {
                if (a.name > b.name) {
                    return 1;
                }else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }              
            }            
        })

        return mapeamento
    }

    getDiskInfo(){
        try {
            var disks = nodeDiskInfo.getDiskInfoSync();            
            var response = [];
            var ite = 0;

            for (const disk of disks) {
                response.push({
                    id:ite,
                    name:disk.mounted,
                    path:`${disk.mounted}\\`,
                    children:[],
                    disk:true,
                })
                ite ++;
            }

            return response
        } catch (error) {}
    }

}

module.exports = SystemFiles

