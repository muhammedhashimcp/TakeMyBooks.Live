const settingsSchema = require("../models/settingsSchema")
const categorySchema = require("../models/categorySchema")
const subCategorySchema = require("../models/subCategorySchema")
const user = require("../models/userSchema");
const { isObjectIdOrHexString } = require("mongoose");
const mongoose = require("mongoose")

const addCategory = async (req, res, next) => {
    try {
        const categoryReq = req.body.category
        const presentCategories = await categorySchema.findOne({ category: categoryReq })
        if (presentCategories) {
            res.json(false)
        } else {
            const newCategory = new categorySchema({
                category: categoryReq
            })
            const category = await newCategory.save();
            res.json(true)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        let id = req.params.id
        const categoryData = await categorySchema.deleteOne({
            _id: id
        });
        if (categoryData) {
            res.status(200).json(true)
        } else {
            res.status(200).json(false)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
const addSubCategory = async (req, res, next) => {
    try {
        let categoryId = req.params.id
        const subCategoryReq = req.body.subCategory
        const subCategoryExist = await subCategorySchema.findOne({ subCategory: subCategoryReq })

        console.log(subCategoryExist);
        if (subCategoryExist) {
            const subCategories = await categorySchema.findOne({ _id: categoryId }, { subCategories: subCategoryExist._id })
            console.log(subCategories, "yes");

            if (!subCategories) {
                console.log('inside');
                const newSub = subCategoryExist._id
                const subCategoryUpdated = await categorySchema.updateOne({ _id: categoryId }, { $push: { subCategories: newSub } })
                console.log(subCategories);

                res.json(true)
            } else {
                res.json(false)
            }
        } else {
            const newSubCategory = new subCategorySchema({
                subCategory: subCategoryReq,
            })
            const category = await newSubCategory.save();
            const newUpdatedSubCategory = await subCategorySchema.findOne({ subCategory: subCategoryReq }, { _id: 1 })
            const subCategoryUpdated = await categorySchema.updateOne({ _id: categoryId }, { $push: { subCategories: newUpdatedSubCategory } })
            res.json(true)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};


const displaySubCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id
        console.log(categoryId);
        const presentSubCategories = await categorySchema.findOne({ _id: categoryId }, { subCategories: 1, _id: 0 }).populate('subCategories').exec()
        console.log(presentSubCategories);
        if (presentSubCategories) {
            res.json(presentSubCategories)
        } else {
            res.status(400).json(false)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const deleteSubCategory = async (req, res, next) => {
    try {
        let subCategoryId = req.params.id
        const categoryId = req.body.categoryId

        console.log(categoryId);
        console.log(subCategoryId);
        const subCategoryDeleted = await subCategorySchema.deleteOne({
            _id: subCategoryId
        });
        console.log(subCategoryDeleted);

        const subCategoryRefRemoved = await categorySchema.update({ _id: categoryId }, {
            $pull: {
                subCategories: subCategoryId
            }
        })

        // collection.update(
        //     { _id: id },
        //     { $pull: { 'contact.phone': { number: '+1786543589455' } } }
        // );

        console.log(subCategoryRefRemoved);
        // db.stores.update(
        //     {},
        //     { $pull: { fruits: { $in: ["apples", "oranges"] }, vegetables: "carrots" } },
        //     { multi: true }
        // )
        if (subCategoryDeleted) {
            res.status(200).json(true)
        } else {
            res.status(400).json(false)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const addLanguage = async (req, res, next) => {
    try {
        const languageReq = req.body.language
        const presentLanguages = await settingsSchema.findOne({ language: languageReq }, { language: 1 })
        console.log(presentLanguages);

        if (presentLanguages) {
            res.json(false)
        } else {
            const newLanguageUpdated = await settingsSchema.updateOne({}, { $push: { language: languageReq } }, { upsert: true })
            console.log(newLanguageUpdated);
            res.json(true)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const addPricingType = async (req, res, next) => {
    try {
        const pricingTypeReq = req.body.pricingType
        const presentPricingType = await settingsSchema.findOne({ pricingType: pricingTypeReq })
        if (presentPricingType) {
            res.json(false)
        } else {
            const newPricingUpdated = await settingsSchema.updateOne({}, { $push: { pricingType: pricingTypeReq } }, { upsert: true })
            console.log(newPricingUpdated);
            res.json(true)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const addVendorType = async (req, res, next) => {
    try {
        const vendorTypeReq = req.body.vendorType
        const presentVendorType = await settingsSchema.findOne({ vendorType: vendorTypeReq })
        if (presentVendorType) {
            res.json(false)
        } else {
            const newVendorTypeUpdated = await settingsSchema.updateOne({}, { $push: { vendorType: vendorTypeReq } }, { upsert: true })
            console.log(newVendorTypeUpdated);
            res.json(true)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};




module.exports = {
    addCategory,
    deleteCategory,
    addSubCategory,
    displaySubCategory,
    deleteSubCategory,
    addLanguage,
    addPricingType,
    addVendorType,
}