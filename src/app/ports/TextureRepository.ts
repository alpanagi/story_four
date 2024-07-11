export interface TextureRepository {
    get(filename: string): Promise<ImageBitmap>;
}
