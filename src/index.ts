import app from './app'

app.listen(app.get('port'), ()=>{
    console.log(`server ready on port:`,app.get('port') );
});