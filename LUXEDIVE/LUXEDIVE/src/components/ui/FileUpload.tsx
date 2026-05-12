import { useCallback, useState } from 'react'
import { UploadCloud, X, File, CheckCircle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { supabase } from '../../lib/supabaseClient'
import { toast } from 'sonner'

interface FileUploadProps {
  bucket: string
  onUploadComplete?: (url: string, originalFilename: string) => void
  label?: string
  accept?: string
  maxSizeMB?: number
  userId?: string
}

export function FileUpload({
  bucket,
  onUploadComplete,
  label = "Upload file",
  accept = "image/*,application/pdf",
  maxSizeMB = 5,
  userId
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [success, setSuccess] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (file.size / 1024 / 1024 > maxSizeMB) {
      toast.error(`File too large. Max size is ${maxSizeMB}MB`)
      return
    }

    setFile(file)
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = userId ? `${userId}/${fileName}` : `${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath)

      setSuccess(true)
      onUploadComplete?.(publicUrl, file.name)
      toast.success("Upload complete")
    } catch (error: any) {
      console.error(error)
      toast.error("Upload failed: " + error.message)
      setFile(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full">
      {success && file ? (
        <div className="flex items-center justify-between p-4 bg-emerald-900/20 border border-emerald-900/50 rounded-lg">
          <div className="flex items-center gap-3 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
          </div>
          <button onClick={() => { setFile(null); setSuccess(false); }} className="text-emerald-400 hover:text-emerald-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-colors",
            dragActive ? "border-luxe-gold bg-luxe-gold/5" : "border-luxe-gray/30 bg-luxe-gray/5 hover:bg-luxe-gray/10 hover:border-luxe-gray/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept={accept}
            disabled={uploading}
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-luxe-gray">
            {uploading ? (
              <div className="animate-pulse flex flex-col items-center">
                <UploadCloud className="w-8 h-8 mb-2 animate-bounce" />
                <p className="text-sm">Uploading...</p>
              </div>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-luxe-gray/70">Drag & drop or click</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
