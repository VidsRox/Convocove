"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import qs from "query-string"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FileUpload } from "../file-upload"
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Attachment is required."
    }),
})

export const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === "messageFile" 
    const { apiUrl, query } = data || {}
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }

    })

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try {
         console.log("Submitting form with values:", values);
         const url = qs.stringifyUrl({
            url: apiUrl || "",
            query,
         })
         console.log("Posting to URL:", url);
         
         await axios.post(url, {
            content: values.fileUrl,
            fileUrl: values.fileUrl
         })

         console.log("Form submitted successfully");
         form.reset()
         router.refresh()
         handleClose()
       } catch (error) {
         console.log("Form submission error:", error)
       }
    }

    return (
         <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add Attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                endpoint="messageFile"
                                                value={field.value}
                                                onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                           <Button type="submit" variant="primary" disabled={isLoading}>
                            Send
                           </Button>         
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
         </Dialog>
    )
}