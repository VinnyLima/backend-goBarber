import { container } from 'tsyringe';

import IHasheProvider from './HashProvider/models/IHashProviders';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHasheProvider>('HashProvider', BCryptHashProvider);
