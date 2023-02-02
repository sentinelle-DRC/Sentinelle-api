import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://sirMelka:SENTinelle1945@sentinelle.oukuvgu.mongodb.net/?retryWrites=true&w=majority'),
  },
];