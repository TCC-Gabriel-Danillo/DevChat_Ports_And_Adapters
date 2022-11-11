import axios, { AxiosInstance, AxiosError } from "axios"; 
import { HttpRepository } from "../../domain/repositories";
import { ErrorFromRes, ServerError } from "../erros/http"


const headers = {
    'Content-Type': 'application/json'
};

export class HttpRepositoryImp implements HttpRepository {
    api: AxiosInstance;
    constructor(baseURL: string){
        this.api = axios.create({
            baseURL, 
            headers
        })
    }
   async post <T>(endpoint: string, data: Record<string, any>, config?: any): Promise<T | undefined>  {
        try {
            const response = await this.api.post(endpoint, data, { ...config });
            return response.data as T;
        } catch(error){
            if (error instanceof AxiosError) throw this.handleAxiosError(error)
            throw new ServerError()
        }
   }
    async get <T>(endpoint: string, params?: Record<string, any>, config?: any): Promise<T | undefined> {
        try {
            const response = await this.api.get(endpoint, { ...config, params });
            return response.data as T;
        } catch(error){
            if (error instanceof AxiosError) throw this.handleAxiosError(error)
            throw new ServerError()
        }
    }

    handleAxiosError(error: AxiosError<any, any>) {
        const { status, message } = error
        const errorFromRes = ErrorFromRes(status, message)
        if (errorFromRes) return errorFromRes
        return new ServerError(message)
      }



}