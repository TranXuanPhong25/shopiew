"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Button } from "@/components/ui/button"

import { useCallback, useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TiptapMenu from "./tiptap-menu"
import "@/assets/styles/tiptap.css"

interface ProductDescriptionEditorProps {
   content?: string
   onChange: (content: string) => void
   id?: string
   placeholder?: string
   isDirty?: boolean
   onImageUpload?: (file: File) => Promise<string> // Function to handle image upload
}

export default function ProductDescriptionEditor({
   content = "",
   id = "product-description",
   onChange,
   isDirty = false,
   onImageUpload
}: ProductDescriptionEditorProps) {
   const [linkUrl, setLinkUrl] = useState("")
   const [showLinkInput, setShowLinkInput] = useState(false)
   const [imageUrl, setImageUrl] = useState("")
   const [isUpdatingFromEditor, setIsUpdatingFromEditor] = useState(false)
   const fileInputRef = useRef<HTMLInputElement>(null)

   const editor = useEditor({
      extensions: [
         StarterKit,
         TextStyle,
         Color,
         Image.configure({
            inline: false,
            allowBase64: true,
            HTMLAttributes: {
               class: 'max-w-full h-auto rounded-lg',
            },
         })
      ],
      content,
      onUpdate: ({ editor }) => {
         setIsUpdatingFromEditor(true)
         onChange(editor.getHTML())
         setTimeout(() => setIsUpdatingFromEditor(false), 10)
      },
      editorProps: {
         attributes: {
            class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
         },
         handlePaste: (view, event) => {
            handlePaste(event)
            return false
         },
      },
      immediatelyRender: true,
   })
   // Handle image upload
   const handleImageUpload = useCallback(async (file: File) => {
      if (!editor) return

      try {
         let imageUrl: string

         if (onImageUpload) {
            // Use custom upload function if provided
            imageUrl = await onImageUpload(file)
         } else {
            // Convert to base64 as fallback
            imageUrl = await new Promise<string>((resolve) => {
               const reader = new FileReader()
               reader.onload = () => resolve(reader.result as string)
               reader.readAsDataURL(file)
            })
         }

         // Insert image into editor
         editor.chain().focus().setImage({ src: imageUrl }).run()
      } catch (error) {
         console.error("Failed to upload image:", error)
      }
   }, [editor, onImageUpload])

   // Handle paste events for images
   const handlePaste = useCallback((event: ClipboardEvent) => {
      if (!editor) return

      const items = event.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
         const item = items[i]
         if (item.type.indexOf('image') !== -1) {
            event.preventDefault()
            const file = item.getAsFile()
            if (file) {
               handleImageUpload(file)
            }
            break
         }
      }
   }, [editor, handleImageUpload])


   useEffect(() => {
      if (!editor || isUpdatingFromEditor) return

      const currentContent = editor.getHTML()
      if (!isDirty && content !== currentContent && content !== "") {
         editor.commands.setContent(content)
      }
   }, [content, isDirty, editor, isUpdatingFromEditor])

   const setLink = useCallback(() => {
      if (!editor) return

      if (linkUrl) {
         editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
         setLinkUrl("")
         setShowLinkInput(false)
      }
   }, [editor, linkUrl])

   const toggleLink = () => {
      if (!editor) return

      if (editor.isActive("link")) {
         editor.chain().focus().unsetLink().run()
      } else {
         setShowLinkInput(true)
      }
   }


   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file && file.type.startsWith('image/')) {
         handleImageUpload(file)
      }
      // Reset the input
      if (fileInputRef.current) {
         fileInputRef.current.value = ''
      }
   }

   const openFileDialog = () => {
      fileInputRef.current?.click()
   }

   if (!editor) {
      return null
   }

   return (
      <div className="w-full max-w-4xl mx-auto border rounded-lg overflow-hidden">
         {/* Hidden file input */}
         <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
         />

         {/* Toolbar */}
         <TiptapMenu
            editor={editor}
            toggleLink={toggleLink}
            openFileDialog={openFileDialog}
         />

         {/* Link Input */}
         {showLinkInput && (
            <div className="border-b bg-blue-50 p-3 flex items-center gap-2">
               <Label htmlFor="link-url" className="text-sm font-medium">
                  URL:
               </Label>
               <Input
                  id="link-url"
                  type="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        setLink()
                     } else if (e.key === "Escape") {
                        setShowLinkInput(false)
                        setLinkUrl("")
                     }
                  }}
               />
               <Button type="button" size="sm" onClick={setLink}>
                  Add Link
               </Button>
               <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                     setShowLinkInput(false)
                     setLinkUrl("")
                  }}
               >
                  Cancel
               </Button>
            </div>
         )}

      
         {/* Editor */}
         <div className="bg-white relative">
            <EditorContent editor={editor} className="min-h-[200px] focus-within:outline-none" id={id} />
         </div>

         {/* Footer with character count */}
         <div className="border-t bg-gray-50 px-4 py-2 text-sm text-gray-600 flex justify-between items-center">
            <span>Product description should be more than 100 characters. You can paste images directly or upload them.</span>
            <span>{editor.getText().length} characters</span>
         </div>
      </div>
   )
}
