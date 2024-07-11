export async function texture_repository_get(filename: string): Promise<ImageBitmap> {
    const data = await fetch(`assets/textures/${filename}`);
    const blob = await data.blob();
    return await createImageBitmap(blob, { colorSpaceConversion: "none" });
}
