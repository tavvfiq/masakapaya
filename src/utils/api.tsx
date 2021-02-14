import Axios, { AxiosInstance, AxiosResponse } from 'axios';

const apiURL = 'https://masak-apa.tomorisakura.vercel.app/api';

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

  fetchFood = (page: number) => {
    return this._instance.get(`/recipes/${page}`);
  };
}

export default new Api(apiURL);
