import mongoose, { Model, Schema } from 'mongoose';
import { CreateInterestRequest } from '../models/interest';

const CreateInterestRequestSchema: Schema<CreateInterestRequest> = new mongoose.Schema({
  rate: {
    type: Number,
    min: 0,
    max: 1,
    required: true,
  },
});

const CreateInterestRequestModel: Model<CreateInterestRequest> = mongoose.model('interestRequest', CreateInterestRequestSchema);

export { CreateInterestRequestSchema, CreateInterestRequestModel };
