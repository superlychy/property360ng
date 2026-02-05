// Simple markdown renderer for basic formatting
export default function SimpleMarkdown({ content }: { content: string }) {
    // Convert markdown to HTML-like structure
    const renderContent = (text: string) => {
        const lines = text.split('\n')
        const elements: JSX.Element[] = []
        let currentList: string[] = []
        let key = 0

        const flushList = () => {
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-${key++}`} className="list-disc pl-6 mb-4 space-y-2">
                        {currentList.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                )
                currentList = []
            }
        }

        lines.forEach((line, index) => {
            // Headings
            if (line.startsWith('### ')) {
                flushList()
                elements.push(
                    <h3 key={`h3-${key++}`} className="text-2xl font-bold mb-4 mt-8 text-white">
                        {line.replace('### ', '')}
                    </h3>
                )
            } else if (line.startsWith('## ')) {
                flushList()
                elements.push(
                    <h2 key={`h2-${key++}`} className="text-3xl font-bold mb-6 mt-10 text-white">
                        {line.replace('## ', '')}
                    </h2>
                )
            } else if (line.startsWith('# ')) {
                flushList()
                elements.push(
                    <h1 key={`h1-${key++}`} className="text-4xl font-bold mb-8 mt-12 text-white">
                        {line.replace('# ', '')}
                    </h1>
                )
            }
            // List items
            else if (line.trim().startsWith('*   ') || line.trim().startsWith('- ')) {
                currentList.push(line.trim().replace(/^[\*\-]\s+/, ''))
            }
            // Empty line
            else if (line.trim() === '') {
                flushList()
                elements.push(<div key={`space-${key++}`} className="h-4" />)
            }
            // Regular paragraph
            else if (line.trim()) {
                flushList()
                elements.push(
                    <p key={`p-${key++}`} className="mb-4 leading-relaxed">
                        {line}
                    </p>
                )
            }
        })

        flushList()
        return elements
    }

    return <div className="text-gray-300">{renderContent(content)}</div>
}
