import sql from '../db.js';
import bcrypt from 'bcrypt';


export const createUser = async (req, res) => {
    const { email, name, password } = req.body;
    
    if (!email || !name || !password) {
        return res.status(400).json({ message: 'Email, name, and password are required' });
    }

    try {
        const existingUser = await sql`
            SELECT id FROM users WHERE email =${email} OR name = ${name}`
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email or name already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await sql`
            INSERT INTO users (email, name, password)
            VALUES (${email}, ${name}, ${hashedPassword})
            RETURNING id, email, name, created_at`;
        
        if(newUser.length > 0) {
            return res.status(201).json({
                message: 'User created successfully',
                user: newUser[0]
            });
        } else {
            res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === "23505") {
          return res
            .status(409)
            .json({
              message:
                "User with this email or name already exists (database constraint).",
            });
        }
        res.status(500).json({ message: 'Internal server error' });
     }


}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await sql`
            SELECT id, email, name, password FROM users WHERE email = ${email}`;
        
        if (user.length > 0) {
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (isMatch) {
                return res.status(200).json({
                    message: 'Login successful',
                    user: { id: user[0].id, email: user[0].email, name: user[0].name }
                });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await sql`
            SELECT id, email, name, created_at FROM users WHERE id = ${id}`;
        
        if (user.length > 0) {
            return res.status(200).json(user[0]);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}