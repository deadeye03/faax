"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, PlusCircle } from "lucide-react"
import ImageUploadKit from '@/components/ImageUploadKit'
import Image from '@/components/Image'
import { UpdateIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'
import { deleteProuduct, updateProductData } from '@/actions/product'

export default function EditProductPage({ productData,categories }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        fabric: '',
        gender: '',
        color: '',
        brand: '',
        price: '',
        discount: '',
        s_size: '',
        m_size: '',
        l_size: '',
        xl_size: '',
    })
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [images, setImages] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setFormData(productData)
        setTags(productData.tags || [])
        setImages(productData.images || [])
    }, [])


    const handleChange = (e) => {
        const { name, value, type } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    }

    const addTag = () => {
        if (currentTag.trim() !== "") {
            setTags((prevTags) => [...prevTags, currentTag.trim()])
            setCurrentTag("")
        }
    }

    const removeTag = (tagToRemove) => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const updateData = {
            name: formData.name,
            description: formData.description,
            category: formData.category||productData.category ,
            fabric: formData.fabric || productData.fabric,
            gender: formData.gender || productData.gender,
            color: formData.color,
            brand: formData.brand,
            price: Number(formData.price),
            discount: Number(formData.discount),
            s_size: Number(formData.s_size),
            m_size: Number(formData.m_size),
            l_size: Number(formData.l_size),
            xl_size: Number(formData.xl_size),
            tags,
            images,
        };
        console.log('updated data is ',updateData);
        const update = await updateProductData(productData.id, updateData)
        if (update) {
            alert('data is updated')
            setIsSubmitting(false);
            router.push(`/admin/Ecommerce/List-of-Product`)
        }
        else {
            alert('not update data');
            setIsSubmitting(false)
        }
    }
    const handleDelete=async (id)=>{
        if (confirm('Are you sure you want to Delete this Product')) {
           await deleteProuduct(id)
           router.push(`/admin/Ecommerce/List-of-Product`)
          } else {
            // Do nothing!
            return;
          }
          

    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-2">Edit Product</h1>
            <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' 
            onClick={()=>handleDelete(productData.id)} > 
            DELETE </button>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <Card className="bg-transparent p-2 border border-gray-400">
                        <CardHeader>
                            <CardTitle>Product Details <span className='text-red-500'>Product Id : </span>{productData.id} </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label htmlFor="name" className="text-base font-semibold">
                                    Product Name <span className="text-red-500">*</span>
                                </Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="description" className="text-base font-semibold">
                                    Description <span className="text-red-500">*</span>
                                </Label>
                                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="category" className="text-base font-semibold">
                                        Category <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder={productData.category} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category,i)=>
                                            <SelectItem key={`${category}-${i}`} value={`${category}`}>{category}</SelectItem>
                                            )}
                                            
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="fabric" className="text-base font-semibold">
                                        Fabric <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={formData.fabric} onValueChange={(value) => handleSelectChange('fabric', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder={productData.fabric} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cotton">Cotton</SelectItem>
                                            <SelectItem value="polyester">Polyester</SelectItem>
                                            <SelectItem value="silk">Silk</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="gender" className="text-base font-semibold">
                                        Gender <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder={productData.gender} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="unisex">Unisex</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="color" className="text-base font-semibold">
                                        Product Color <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="color" name="color" value={formData.color} onChange={handleChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="brand" className="text-base font-semibold">
                                        Brand <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price" className="text-base font-semibold">
                                        Price <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="discount" className="text-base font-semibold">
                                        Discount Percentage
                                    </Label>
                                    <Input id="discount" name="discount" type="number" min="0" max="100" value={formData.discount} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="s_size" className="text-base font-semibold">
                                        S Size Quantity <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="s_size" name="s_size" type="number" min="0" value={formData.s_size} onChange={handleChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="m_size" className="text-base font-semibold">
                                        M Size Quantity <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="m_size" name="m_size" type="number" min="0" value={formData.m_size} onChange={handleChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="l_size" className="text-base font-semibold">
                                        L Size Quantity <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="l_size" name="l_size" type="number" min="0" value={formData.l_size} onChange={handleChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="xl_size" className="text-base font-semibold">
                                        XL Size Quantity <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="xl_size" name="xl_size" type="number" min="0" value={formData.xl_size} onChange={handleChange} required />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="tags" className="text-base font-semibold">
                                    Tags
                                </Label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 focus:outline-none"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        id="tags"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        placeholder="Enter a tag"
                                    />
                                    <Button type="button" onClick={addTag}>
                                        Add Tag
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label className="text-base font-semibold">
                                Product Images <span className="text-red-500">*</span>
                            </Label>
                            <div className="mt-2 border-2 border-dashed border-gray-300 p-6 rounded-md">
                                <ImageUploadKit images={images} setImages={setImages} setIsSubmitting={setIsSubmitting} />
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <Image path={`/${image}`} height={200} width={200} alt={`backend-image${index}`} />

                                            {/* THIS BUTTON WHEN CLICK THEN THAT'S IMAGE REMOVE FROM images array */}

                                            <button
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-white rounded-full p-1"
                                            >
                                                <X className="h-4 w-4 text-red-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6 text-center">
                    <Button type="submit" onClick={(e) => handleSubmit(e)} className="w-[30%] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disable={isSubmitting.toString()}>
                        {isSubmitting ? 'Updating please wait.....' : <span className="flex justify-center items-center"> <UpdateIcon className="mr-2 h-4 w-4" /> Update Product </span>}
                    </Button>
                </div>
            </form>
        </div>
    )
}