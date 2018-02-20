module.exports ={
  globalNav : function (to,from,next) {
    if(localStorage.getItem('token')){
      next({name : 'Home'})
    }
    else {
      next()
    }
  },

  authNav : function (to,from,next) {
    if(!localStorage.getItem('token')){
      next({
        name : 'Login'
      })
    }
    else {
      next()
    }
  }
}