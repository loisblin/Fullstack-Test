import mongoose, { Document, Schema } from 'mongoose';

interface IItem extends Document {
  
  name: string;
  level: number;
  type: string;
  description: string;
  image: string;
}

const itemSchema = new Schema<IItem>({
 
  name: { type: String, required: true },
  level: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const Item = mongoose.models.Item || mongoose.model<IItem>('Item', itemSchema);

export default Item;
