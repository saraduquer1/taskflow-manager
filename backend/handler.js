const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TASKS_TABLE = process.env.TASKS_TABLE;

// Headers CORS comunes
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

// Función auxiliar para respuestas
const response = (statusCode, body) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});

// Generar UUID manualmente (sin librería)
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * GET /tasks - Obtener todas las tareas
 */
module.exports.getTasks = async (event) => {
  try {
    const result = await dynamoDb.scan({
      TableName: TASKS_TABLE,
    }).promise();

    // Ordenar por fecha de creación (más reciente primero)
    const tasks = result.Items.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    return response(200, tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    return response(500, { error: 'No se pudieron obtener las tareas' });
  }
};

/**
 * GET /tasks/{id} - Obtener una tarea específica
 */
module.exports.getTask = async (event) => {
  try {
    const { id } = event.pathParameters;

    const result = await dynamoDb.get({
      TableName: TASKS_TABLE,
      Key: { taskId: id },
    }).promise();

    if (!result.Item) {
      return response(404, { error: 'Tarea no encontrada' });
    }

    return response(200, result.Item);
  } catch (error) {
    console.error('Error getting task:', error);
    return response(500, { error: 'No se pudo obtener la tarea' });
  }
};

/**
 * POST /tasks - Crear nueva tarea
 */
module.exports.createTask = async (event) => {
  try {
    const data = JSON.parse(event.body);
    
    // Validación básica
    if (!data.title || !data.priority) {
      return response(400, { error: 'Título y prioridad son requeridos' });
    }

    const timestamp = new Date().toISOString();
    const task = {
      taskId: generateUUID(),
      title: data.title,
      description: data.description || '',
      priority: data.priority,
      status: 'pendiente',
      createdAt: timestamp,
      dueDate: data.dueDate || '',
    };

    await dynamoDb.put({
      TableName: TASKS_TABLE,
      Item: task,
    }).promise();

    return response(201, task);
  } catch (error) {
    console.error('Error creating task:', error);
    return response(500, { error: 'No se pudo crear la tarea' });
  }
};

/**
 * PUT /tasks/{id} - Actualizar tarea
 */
module.exports.updateTask = async (event) => {
  try {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);

    // Verificar que la tarea existe
    const existing = await dynamoDb.get({
      TableName: TASKS_TABLE,
      Key: { taskId: id },
    }).promise();

    if (!existing.Item) {
      return response(404, { error: 'Tarea no encontrada' });
    }

    // Construir expresión de actualización dinámica
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    if (data.title !== undefined) {
      updateExpressions.push('#title = :title');
      expressionAttributeNames['#title'] = 'title';
      expressionAttributeValues[':title'] = data.title;
    }
    if (data.description !== undefined) {
      updateExpressions.push('#description = :description');
      expressionAttributeNames['#description'] = 'description';
      expressionAttributeValues[':description'] = data.description;
    }
    if (data.priority !== undefined) {
      updateExpressions.push('#priority = :priority');
      expressionAttributeNames['#priority'] = 'priority';
      expressionAttributeValues[':priority'] = data.priority;
    }
    if (data.status !== undefined) {
      updateExpressions.push('#status = :status');
      expressionAttributeNames['#status'] = 'status';
      expressionAttributeValues[':status'] = data.status;
    }
    if (data.dueDate !== undefined) {
      updateExpressions.push('#dueDate = :dueDate');
      expressionAttributeNames['#dueDate'] = 'dueDate';
      expressionAttributeValues[':dueDate'] = data.dueDate;
    }

    const result = await dynamoDb.update({
      TableName: TASKS_TABLE,
      Key: { taskId: id },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    }).promise();

    return response(200, result.Attributes);
  } catch (error) {
    console.error('Error updating task:', error);
    return response(500, { error: 'No se pudo actualizar la tarea' });
  }
};

/**
 * DELETE /tasks/{id} - Eliminar tarea
 */
module.exports.deleteTask = async (event) => {
  try {
    const { id } = event.pathParameters;

    // Verificar que existe antes de eliminar
    const existing = await dynamoDb.get({
      TableName: TASKS_TABLE,
      Key: { taskId: id },
    }).promise();

    if (!existing.Item) {
      return response(404, { error: 'Tarea no encontrada' });
    }

    await dynamoDb.delete({
      TableName: TASKS_TABLE,
      Key: { taskId: id },
    }).promise();

    return response(200, { message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return response(500, { error: 'No se pudo eliminar la tarea' });
  }
};