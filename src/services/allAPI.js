import { commonAPI } from "./CommonApi"
import { Base_url } from "./baseURL"


//add art work
export const addTodoListAPI = async(todo)=>{
    return await commonAPI("POST",`${Base_url}/todo/add-todolist`,todo,"")
}

//api calls to get all todolist
export const getAllTodoListAPI = async()=>{
    return await commonAPI("GET",`${Base_url}/todo/all-todo`)
}