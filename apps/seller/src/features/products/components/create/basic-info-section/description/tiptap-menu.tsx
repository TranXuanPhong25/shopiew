import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useEditor} from "@tiptap/react";
import {
    Bold,
    Check,
    Heading1,
    Heading2,
    Heading3,
    ImageUp,
    Italic,
    LinkIcon,
    List,
    ListOrdered,
    Palette,
    Quote,
    Redo,
    UnderlineIcon,
    Undo,
    X
} from "lucide-react";
import {useState} from "react";

export default function TiptapMenu({
   editor,
   toggleLink,
   openFileDialog
}: {
   toggleLink: () => void;
   openFileDialog?: () => void
   editor: ReturnType<typeof useEditor>
}) {
   const [_, refreshMenu] = useState(true);
   const [showColorPicker, setShowColorPicker] = useState(false);
   const [selectedColor, setSelectedColor] = useState('#000000');

   if (!editor) {
      return null;
   }
   return (
      <div className="border-b bg-gray-50 p-2 flex flex-wrap items-center gap-1">
         {/* Text Formatting */}
         <Button
            type="button"
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
            onClick={() => {
               editor.chain().focus().toggleBold().run();
               refreshMenu((prev) => !prev);
            }}
         >
            <Bold className="h-4 w-4" />
         </Button>

         <Button
            type="button"
            variant={editor.isActive("italic") ? "default" : "ghost"}
            size="sm"
            onClick={() => {
               editor.chain().focus().toggleItalic().run();
               refreshMenu((prev) => !prev);
            }}
         >
            <Italic className="h-4 w-4" />
         </Button>

         <Button
            type="button"
            variant={editor.isActive("underline") ? "default" : "ghost"}
            size="sm"
            onClick={() => {
               editor.chain().focus().toggleUnderline().run();
               refreshMenu((prev) => !prev);
            }}
         >
            <UnderlineIcon className="h-4 w-4" />
         </Button>

         {/* Color Picker */}
         <div className="relative">
            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => setShowColorPicker(!showColorPicker)}
               title="Text Color"
            >
               <Palette className="h-4 w-4" />
            </Button>

            {showColorPicker && (
               <div className="absolute top-full left-0 z-10 bg-white border rounded-lg shadow-lg p-3 mt-1">
                  <div className="flex items-center gap-2">
                     <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="size-10 rounded border border-gray-300 cursor-pointer"
                        title="Pick a color"
                     />
                     <Button
                        type="button"
                        className="px-3 py-1 bg-emerald-500 text-white text-sm rounded hover:bg-emerald-600 transition-colors"
                        onClick={() => {
                           editor.chain().focus().setColor(selectedColor).run();
                           setShowColorPicker(false);
                           refreshMenu((prev) => !prev);
                        }}
                     >
                        <Check className="h-4 w-4" />
                     </Button>
                     <Button
                        type="button"
                        className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                        onClick={() => {
                           editor.chain().focus().unsetColor().run();
                           setSelectedColor('#000000');
                           setShowColorPicker(false);
                           refreshMenu((prev) => !prev);
                        }}
                        title="Remove color"
                     >
                        <X className="h-4 w-4" />
                     </Button>
                  </div>
               </div>
            )}
         </div>

         <Separator orientation="vertical" className="h-6" />

         {/* Headings */}
         <Button
            type="button"
            variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
         >
            <Heading1 className="h-4 w-4" />
         </Button>

         <Button
            type="button"
            variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
         >
            <Heading2 className="h-4 w-4" />
         </Button>

         <Button
            type="button"
            variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
         >
            <Heading3 className="h-4 w-4" />
         </Button>

         <Separator orientation="vertical" className="h-6" />

         {/* Lists */}
         <Button
            type="button"
            variant={editor.isActive("bulletList") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
         >
            <List className="h-4 w-4" />
         </Button>

         <Button
            type="button"
            variant={editor.isActive("orderedList") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
         >
            <ListOrdered className="h-4 w-4" />
         </Button>

         <Separator orientation="vertical" className="h-6" />

         {/* Quote */}
         <Button
            type="button"
            variant={editor.isActive("blockquote") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
         >
            <Quote className="h-4 w-4" />
         </Button>

         {/* Link */}
         <Button
            type="button"
            variant={editor.isActive("link") ? "default" : "ghost"}
            size="sm"
            onClick={toggleLink}
         >
            <LinkIcon className="h-4 w-4" />
         </Button>
         <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={openFileDialog}
            className="p-2"
            title="Upload image file"
         >
            <ImageUp className="h-4 w-4" />
         </Button>
         <Separator orientation="vertical" className="h-6" />
         {/* Undo/Redo */}
         <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
         >
            <Undo className="h-4 w-4" />
         </Button>

         <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
         >
            <Redo className="h-4 w-4" />
         </Button>

      </div>
   )
}