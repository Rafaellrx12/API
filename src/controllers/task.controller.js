const TaskModel = require("../models/task.model");
const { notFoundError } = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.supabase = req.supabase;  // Adicionando o cliente do Supabase
  }

  async getAll() {
    try {
      const { data, error } = await this.supabase
        .from('tasks')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }

      this.res.status(200).send(data);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async getById() {
    try {
      const taskId = this.req.params.id;

      const { data, error } = await this.supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (error || !data) {
        return this.res.status(404).send("Este dado não foi encontrado!");
      }

      return this.res.status(200).send(data);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async create() {
    try {
      const newTask = this.req.body;

      const { data, error } = await this.supabase
        .from('tasks')
        .insert([newTask]);

      if (error) {
        throw new Error(error.message);
      }

      this.res.status(201).send(data[0]);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async update() {
    try {
      const taskId = this.req.params.id;
      const taskData = this.req.body;

      const { data, error } = await this.supabase
        .from('tasks')
        .update(taskData)
        .eq('id', taskId);

      if (error) {
        throw new Error(error.message);
      }

      this.res.status(200).send(data[0]);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async delete() {
    try {
      const taskId = this.req.params.id;

      const { data, error } = await this.supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        throw new Error(error.message);
      }

      this.res.status(200).send(data);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;

