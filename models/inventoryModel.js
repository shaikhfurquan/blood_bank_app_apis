import mongoose from 'mongoose';


const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, 'Inventory type is required'],
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
        trim: true,
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
    },
    quantity: {
        type: Number,
        required: [true, 'Blood quantity is required'],
        min: [0, 'Quantity must be non-negative']
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, 'Organization is required']
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.inventoryType === 'out'
        }
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.inventoryType === 'in'
        }
    }
}, { timestamps: true });

const InventoryModel = mongoose.model('Inventory', inventorySchema);

export default InventoryModel;