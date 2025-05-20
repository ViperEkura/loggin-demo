// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();


const USERS_FILE = path.join(__dirname, 'users.json');
const PORT = 3000;


app.use(cors());
app.use(express.json());

// 同步读取用户数据
const readUsers = () => {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(USERS_FILE)) {
      // 文件不存在时创建目录和默认用户文件
      const defaultUsers = [
        { id: 1, username: 'admin', password: '123456' }
      ];
      fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
      fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
      return defaultUsers;
    }
    
    // 读取并解析文件内容
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('读取用户文件失败:', err);
    throw err;
  }
};

// 登录接口（修改后）
app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 1. 读取用户数据
    const users = readUsers();
    
    // 2. 验证用户凭证
    const user = users.find(u => 
      u.username === username && u.password === password
    );

    if (user) {
      // 3. 登录成功响应（不返回密码）
      res.json({ 
        success: true,
        message: 'Login success',
        user: {
          id: user.id,
          username: user.username
          // 可以添加其他非敏感字段
        }
      });
    } else {
      // 4. 登录失败响应
      res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        message: 'Invalid credentials'
      });
    }
    
  } catch (err) {
    // 5. 服务器错误处理
    console.error('nternal server error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Internal server error'
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});