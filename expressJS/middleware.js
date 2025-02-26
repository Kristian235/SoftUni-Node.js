const middlewares = [];

function use(middleware){
    middlewares.push(middleware);
}

function execute(req, res, callback){
    let index = 0;

    const next = () => {
        if(index < middlewares.length){
            middlewares[index++](req, res, next);
        }else{
            callback(req, res);
        }
    }
    next();
}

modile.exports = {
    use,
    execute
}