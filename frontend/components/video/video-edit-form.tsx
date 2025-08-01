import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { VideoUpdateData } from "@/lib/services/video-service"
import { useLanguage } from "@/lib/language-provider"

interface VideoEditFormProps {
  video: {
    title: string
    description: string
    category: string
  }
  onUpdate: (data: VideoUpdateData) => void
  onCancel: () => void
}

export function VideoEditForm({ video, onUpdate, onCancel }: VideoEditFormProps) {
  const { t } = useLanguage()
  const [title, setTitle] = useState(video.title)
  const [description, setDescription] = useState(video.description)
  const [category, setCategory] = useState(video.category)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [scriptFile, setScriptFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updateData: VideoUpdateData = {
      title,
      description,
      category,
      video: videoFile || undefined,
      script: scriptFile || undefined,
      thumbnail: thumbnailFile || undefined
    }
    onUpdate(updateData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">{t("upload.form.title")}</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t("upload.form.description")}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">{t("upload.form.category")}</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="video">{t("upload.form.video_file")}</Label>
        <Input
          id="video"
          type="file"
          accept="video/mp4"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="script">{t("upload.form.script_file")}</Label>
        <Input
          id="script"
          type="file"
          accept=".pdf"
          onChange={(e) => setScriptFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">{t("upload.form.thumbnail_file")}</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("upload.form.cancel_button")}
        </Button>
        <Button type="submit">
          {t("upload.form.upload_button")}
        </Button>
      </div>
    </form>
  )
} 