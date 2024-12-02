import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/user';

const router = express.Router();

//GET /users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        return res.json(users);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

// Get /users/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

// PUT /users:id - update by id
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email } = req.body;
    try {
        const user = await User.findByPk(id);
    if (user) {
        user.username = username;
        user.password = password;
        user.email = email;
        await user.save();
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    } 
} catch (error: any) {
    return res.status(400).json({ message: error.message });
}
});

// DELETE /users/:id - delete by id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            return res.json({ message: 'User deleted' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});
export { router as userRoutes };