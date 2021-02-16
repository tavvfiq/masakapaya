import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GetResponseType } from '@interface/index';

const apiURL = 'http://192.168.0.16:3000/api';

class Api {
  protected readonly _instance: AxiosInstance;
  constructor(baseURL: string) {
    this._instance = Axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this._instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = ({ data }: AxiosResponse<any>) => data;

  protected _handleError = (error: any) => error;

  public fetchRecipe = (page: number): Promise<GetResponseType> =>
    this._instance.get(`/recipes/${page}`);

  public fetchRecipeDetail = (key: string): Promise<GetResponseType> =>
    this._instance.get(`/recipe/?q=${key}`);
}

export default new Api(apiURL);
