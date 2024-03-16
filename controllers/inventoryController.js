import UserModel from "../models/userModel.js"
import InventoryModel from "../models/inventoryModel.js"

export const createInventory = async (req, res) => {
    try {
        const { email, inventoryType} = req.body
        // getting user
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw new Error('User not found');
        }

        if(inventoryType === 'incoming' && user.role !== 'donar'){
            throw new Error('Not a donnar account')
        }
        if(inventoryType === 'outgoing' && user.role !== 'hospital'){
            throw new Error('Not a hospital')
        }

        const inventory = await InventoryModel.create(req.body)
        res.status(201).json({
            success: true,
            message: "New Blood added/created",
            inventory : inventory
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating inventory",
            error: error.message
        })
    }
}