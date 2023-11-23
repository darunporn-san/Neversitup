export interface ILogin {
  username: string;
  password: string;
}

export interface ITodo {
  title: string;
  description: string;
}

export interface ITodoDetail extends ITodo {
    _id:  string;
    user_id:  string;
    createdAt:  string;
    updatedAt:  string;
    message?:string
}
