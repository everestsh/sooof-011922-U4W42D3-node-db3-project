const db = require('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
// // TEST ERR:  http get :9000/api/schemes/1
const checkSchemeId = async (req, res, next) => {
  // console.log("checkSchemeId middleware")
  // next() 
  try{
    const existScheme = await db('schemes').where('scheme_id', req.params.scheme_id).first()
    if(!existScheme){
      next({ status: 404, message: `scheme with scheme_id ${req.params.scheme_id} not found` })
    }else{
      req.scheme = existScheme
      next()
    }
  }catch(err){
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
// TEST ERR:  http post :9000/api/schemes 
// TEST ERR:  http post :9000/api/schemes scheme_name:=12
// TEST OK:  http post :9000/api/schemes scheme_name=AAAA
const validateScheme = (req, res, next) => {
  // console.log("validateScheme  middleware")
  // next()

  try{
    const {scheme_name} = req.body
    if(!scheme_name  || typeof  scheme_name !=='string' || !scheme_name.trim()){
      next({ status: 400, message: `invalid scheme_name` }) 
    }else {
      next()
    }
  }catch(err){
    next(err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
// TEST ERR:  http post :9000/api/schemes/1/steps 
// TEST ERR:  http post :9000/api/schemes/1/steps  scheme_name:=12
// TEST ERR:  http post :9000/api/schemes/1/steps  step_number=AAAA
// TEST ERR:  http post :9000/api/schemes/1/steps  step_number=AAAA instructions=bbb
// TEST OK:  http post :9000/api/schemes/1/steps  step_number:=2 instructions=bbb
const validateStep = (req, res, next) => {
  // console.log("validateStep  middleware")
  // next()
  // (!instructions || !step_number)
  //(instructions === undefined || typeof instructions !=='string' || !instructions.trim() || typeof step_number !== 'number' || step_number<1)
  try{
    const { instructions, step_number } = req.body
    if(!instructions  || typeof  instructions !=='string' || !instructions.trim() 
        ||typeof  step_number !=='number' || step_number<1 ){
      next({ status: 400, message: `invalid step` })  
    }else{
      next()
    }
  }catch(err){
    next(err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
