import axios from 'axios';

const baseURL = "http://138.68.224.139/api/v1";

const BASE_URL = axios.create({ baseURL });

export default BASE_URL;
