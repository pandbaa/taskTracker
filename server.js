const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Разрешаем запросы с других портов
app.use(express.json()); // Парсим JSON в теле запроса

// Путь к файлу с данными
const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');

// Инициализация данных (если файл не существует)
function initDataFile() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = [
        { id: 1, text: "first task", state: "active" },
        { id: 2, text: "second task", state: "active" },
        { id: 3, text: "another task", state: "active" }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Чтение задач из файла
function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
    return [];
  }
}

// Запись задач в файл
function writeTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Ошибка записи файла:', error);
  }
}

// Инициализация
initDataFile();

// ============================================
// 1. GET /tasks - получить список задач
// ============================================
app.get('/tasks', (req, res) => {
  try {
    const tasks = readTasks();
    console.log(`📋 Отправлено ${tasks.length} задач`);
    res.json(tasks);
  } catch (error) {
    console.error('Ошибка при получении задач:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============================================
// 2. POST /tasks - создать новую задачу
// ============================================
app.post('/tasks', (req, res) => {
  try {
    const { text } = req.body;
    
    // Валидация
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Текст задачи обязателен' });
    }
    
    const tasks = readTasks();
    
    // Находим максимальный id
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
    const newId = maxId + 1;
    
    const newTask = {
      id: newId,
      text: text.trim(),
      state: 'active'
    };
    
    tasks.push(newTask);
    writeTasks(tasks);
    
    console.log(`✅ Создана задача ${newId}: "${newTask.text}"`);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============================================
// 3. PATCH /tasks/:id/finish - завершить задачу
// ============================================
app.patch('/tasks/:id/finish', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tasks = readTasks();
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: `Задача с id ${id} не найдена` });
    }
    
    // Проверка, что задача не уже завершена
    if (tasks[taskIndex].state === 'finished') {
      return res.status(400).json({ error: 'Задача уже завершена' });
    }
    
    tasks[taskIndex].state = 'finished';
    writeTasks(tasks);
    
    console.log(`✅ Завершена задача ${id}: "${tasks[taskIndex].text}"`);
    res.json(tasks[taskIndex]);
  } catch (error) {
    console.error('Ошибка при завершении задачи:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============================================
// 4. PATCH /tasks/:id/activate - переоткрыть задачу
// ============================================
app.patch('/tasks/:id/activate', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tasks = readTasks();
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: `Задача с id ${id} не найдена` });
    }
    
    // Проверка, что задача не уже активна
    if (tasks[taskIndex].state === 'active') {
      return res.status(400).json({ error: 'Задача уже активна' });
    }
    
    tasks[taskIndex].state = 'active';
    writeTasks(tasks);
    
    console.log(`✅ Активирована задача ${id}: "${tasks[taskIndex].text}"`);
    res.json(tasks[taskIndex]);
  } catch (error) {
    console.error('Ошибка при активации задачи:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============================================
// Дополнительные endpoints (для удобства)
// ============================================

// DELETE /tasks/:id - удалить задачу
app.delete('/tasks/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tasks = readTasks();
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: `Задача с id ${id} не найдена` });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    writeTasks(tasks);
    
    console.log(`🗑️ Удалена задача ${id}: "${deletedTask.text}"`);
    res.json({ message: `Задача ${id} удалена` });
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// GET /tasks/active - получить активные задачи
app.get('/tasks/active', (req, res) => {
  try {
    const tasks = readTasks();
    const activeTasks = tasks.filter(task => task.state === 'active');
    res.json(activeTasks);
  } catch (error) {
    console.error('Ошибка при получении активных задач:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// GET /tasks/finished - получить завершенные задачи
app.get('/tasks/finished', (req, res) => {
  try {
    const tasks = readTasks();
    const finishedTasks = tasks.filter(task => task.state === 'finished');
    res.json(finishedTasks);
  } catch (error) {
    console.error('Ошибка при получении завершенных задач:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// DELETE /tasks/all - удалить все задачи
app.delete('/tasks/all', (req, res) => {
  try {
    writeTasks([]);
    console.log('🗑️ Все задачи удалены');
    res.json({ message: 'Все задачи удалены' });
  } catch (error) {
    console.error('Ошибка при удалении всех задач:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============================================
// Запуск сервера
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📁 Данные хранятся в ${DATA_FILE}`);
  console.log('📋 Доступные endpoints:');
  console.log('  GET    /tasks');
  console.log('  POST   /tasks');
  console.log('  PATCH  /tasks/:id/finish');
  console.log('  PATCH  /tasks/:id/activate');
  console.log('  DELETE /tasks/:id');
  console.log('  GET    /tasks/active');
  console.log('  GET    /tasks/finished');
  console.log('  DELETE /tasks/all');
});

// Обработка ошибок (необработанные исключения)
process.on('uncaughtException', (error) => {
  console.error('❌ Необработанное исключение:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Необработанный rejection:', reason);
});