import {getRepository}  from 'typeorm'
import User from '../models/User';
import {hash} from 'bcrypt';

interface Request{
  name: string;
  email: string;
  password: string;

}

class CreateUserService{
  public async execute({name, email, password}:Request): Promise<User>{
    const usersRepository = getRepository(User)
    
    const checkUserExists = await usersRepository.findOne({
      where:{email}
    });

    if(checkUserExists){
      throw new Error('Endereço de Email ja existe')
    }

   const hashPassword = await hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password:hashPassword,
    });
    

    await usersRepository.save(user);

    return user;
  }


}
export default CreateUserService