import { supabase } from '../supabase'

export type Article = {
  id: string
  title: string
  category: string
  slug: string
  excerpt: string
  content: string
  image_url: string | null
  is_published: boolean
  created_at: string
  tags: string[] | null 
}

// جلب كل المقالات
export const GetArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

// إضافة مقال
export const CreateArticle = async (article: Omit<Article, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single()

  if (error) throw error
  return data
}

// تعديل مقال
export const UpdateArticle = async (article: Article) => {
  const { id, created_at, ...rest } = article

  const { data, error } = await supabase
    .from('articles')
    .update(rest)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// حذف مقال
export const DeleteArticle = async (id: string) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// رفع صورة المقال
export const UploadArticleImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from('articles-images')
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('articles-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}