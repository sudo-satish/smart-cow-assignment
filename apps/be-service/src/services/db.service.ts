import { Model, Types } from 'mongoose';

abstract class DBService {
  Model: Model<any>
  constructor(Model: Model<any>) {
    this.Model = Model;
  }

  async create(obj: any) {
    const model = new this.Model({...obj, ...this.defaultFields});
    return model.save();
  }

  async find(options: any= {}) {
    return this.Model.find(options);
  }

  update(model, updateObj): any {
    return this.Model.findByIdAndUpdate(
      model._id,
      updateObj,
      { new: true },
    );
  }

  async findById(id) {
    return await this.Model.findById(id).exec();
  }

  get defaultFields() {
    return {}
  }

  async deleteById(id: string) {
    return this.Model.deleteOne({_id: id});
  }

}

export default DBService;
