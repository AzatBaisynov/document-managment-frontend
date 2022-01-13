export async function downloadFile(fileUrl, fileName) {
  const response = await fetch(fileUrl, {
    headers: {
      Authorization : localStorage.getItem("token")
    }
  })

  if (response.status === 200) {
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName
    document.querySelector('p').appendChild(link)
    link.click()
    link.remove()
  }
}