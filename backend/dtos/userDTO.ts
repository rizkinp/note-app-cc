// dtos/userDTO.ts
export interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
  }
  
  export interface LoginUserDTO {
    email: string;
    password: string;
  }
  
  export interface UserResponseDTO {
    id: number;
    username: string;
    email: string;
  }
  