const http=require('http');
const fs=require('fs');
const qs=require('qs');

const server=http.createServer((req, res)=>{
    if(req.method==='GET'){
        fs.readFile('./View/todo.html',((err, data)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            return res.end();
        }))
    }else{
        let data='';
        req.on('data',chunk=>{
            data +=chunk;
        })
        req.on('end',()=>{
            const userInfo=qs.parse(data);
            fs.readFile('./View/display.html','utf-8',((err,datahtml)=>{
                if(err) console.log(err);
                datahtml=datahtml.replace('{todo}',userInfo.todo);
                res.writeHead(200,{'Content-Type':'text-html'});
                res.write(datahtml);
                return res.end();
            }))
        })
        req.on('error',()=>{
            console.log('error');
        })
    }
});
server.listen(8000,()=>{
    console.log('Server running localhost:8000/display.html')
})
