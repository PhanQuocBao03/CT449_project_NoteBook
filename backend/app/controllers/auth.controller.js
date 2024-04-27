const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const User = require("../services/user.service");
const Employee = require("../services/employee.service");

exports.signup = async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        let user = null;
        if (role === 'reader') {
            const userService = new User(MongoDB.client);
            user = await userService.findOne({ username });
        } else if (role === 'staff') {
            const employeeService = new Employee(MongoDB.client);
            user = await employeeService.findOne({ username });
        }
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        if (role === 'reader') {
            const userService = new User(MongoDB.client);
            const newUser = {
                username,
                password: hashpassword,
                email,
                role,
            };
            user = await userService.create(newUser);
            return res.send(user);
        }
        if (role === 'staff') {
            const employeeService = new Employee(MongoDB.client);
            const newUser = {
                username,
                password: hashpassword,
                email,
                role,
            };
            user = await employeeService.create(newUser);
            return res.send(user);
        }
        // await user.save();
        // res.status(200).json({ success: true, message: 'User successfully created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error, please try again' });
    }
};


exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Tìm kiếm người dùng trong dịch vụ User
        const userService = new User(MongoDB.client);
        const user = await userService.findOne({ username });

        // Nếu không tìm thấy người dùng trong UserService, thì tìm trong EmployeeService
        if (!user) {
            const employeeService = new Employee(MongoDB.client);
            const employee = await employeeService.findOne({ username });

            // Kiểm tra xem nhân viên có tồn tại không
            if (!employee) {
                return res.status(401).json({ message: 'Invalid empyoee or password' });
            }

            // Kiểm tra mật khẩu của nhân viên
            const passwordIsValid = await bcrypt.compare(password, employee.password);
            if (!passwordIsValid) {
                return res.status(401).json({ message: 'Invalid  password' });
            }

            // Tạo token JWT cho nhân viên
            const token = jwt.sign({ id: employee._id }, config.jwt.secret, { expiresIn: 86400 }); // 24 hours

            // Trả về thông tin tài khoản và token cho nhân viên
            return res.status(200).json({
                _id: employee._id,
                username: employee.username,
                email: employee.email,
                accessToken: token,
                image:employee.image,
                role: 'staff', // Đặt vai trò là 'staff' cho nhân viên
            });
        }

        // Kiểm tra mật khẩu của người dùng
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Tạo token JWT cho người dùng
        const token = jwt.sign({ id: user._id }, config.jwt.secret, { expiresIn: 86400 }); // 24 hours

        // Trả về thông tin tài khoản và token cho người dùng
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            image:user.image,
            role: 'reader', // Đặt vai trò là 'reader' cho người dùng
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error, please try again' });
    }
};

