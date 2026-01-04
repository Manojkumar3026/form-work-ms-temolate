import React, { useState } from 'react';
import { FileText, Plus, Search, MoreVertical, FileCheck, FileClock, PenTool, Loader2 } from 'lucide-react';
import { Document } from '../types';
import { generateDocumentDraft } from '../services/geminiService';

interface DocumentListProps {
  type: 'QMS' | 'TECH_DOCS';
}

const DocumentList: React.FC<DocumentListProps> = ({ type }) => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 'SOP-001', title: 'Document Control', status: 'RELEASED', version: '2.0', lastModified: '2023-10-15' },
    { id: 'SOP-002', title: 'Risk Management', status: 'RELEASED', version: '1.1', lastModified: '2023-11-02' },
    { id: 'SOP-003', title: 'Design Control', status: 'REVIEW', version: '0.9', lastModified: '2023-11-20' },
    { id: 'SOP-004', title: 'Supplier Management', status: 'DRAFT', version: '0.1', lastModified: '2023-11-25' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  
  // Simulation of viewing a document content
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);

  const handleCreateDraft = async () => {
    if (!newDocTitle) return;
    
    setIsGenerating(true);
    try {
        const content = await generateDocumentDraft(newDocTitle, 'SOP');
        const newDoc: Document = {
            id: `SOP-${Math.floor(Math.random() * 1000)}`,
            title: newDocTitle,
            status: 'DRAFT',
            version: '0.1',
            lastModified: new Date().toLocaleDateString(),
            content: content
        };
        setDocuments([newDoc, ...documents]);
        setViewingDoc(newDoc);
        setShowNewModal(false);
        setNewDocTitle('');
    } catch (e) {
        alert("Failed to generate draft. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  if (viewingDoc) {
      return (
          <div className="h-full flex flex-col bg-white">
              <div className="border-b border-slate-200 px-8 py-4 flex justify-between items-center bg-white sticky top-0 z-10">
                  <div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setViewingDoc(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            ← Back
                        </button>
                        <h2 className="text-xl font-bold text-slate-800">{viewingDoc.id}: {viewingDoc.title}</h2>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200">
                            {viewingDoc.status}
                        </span>
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                          Export PDF
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
                          Edit
                      </button>
                  </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
                  <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm border border-slate-200 min-h-[800px]">
                        <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed">
                            {viewingDoc.content || "# Content not loaded or empty.\n\nThis is a placeholder for the document content viewer."}
                        </pre>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {type === 'QMS' ? 'Quality Management System' : 'Technical Documentation'}
          </h2>
          <p className="text-slate-500 mt-1">Manage your standard operating procedures and policies.</p>
        </div>
        <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm font-medium"
        >
          <Plus size={18} />
          New Document
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search documents..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50">All</button>
            <button className="px-4 py-2 rounded-lg border border-transparent text-slate-500 text-sm font-medium hover:bg-slate-100">Drafts</button>
            <button className="px-4 py-2 rounded-lg border border-transparent text-slate-500 text-sm font-medium hover:bg-slate-100">Released</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Version</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Modified</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <tr 
                key={doc.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => setViewingDoc(doc)}
              >
                <td className="py-4 px-6 text-sm font-medium text-slate-600">{doc.id}</td>
                <td className="py-4 px-6 text-sm font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                        <FileText size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                        {doc.title}
                    </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                    ${doc.status === 'RELEASED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      doc.status === 'REVIEW' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {doc.status === 'RELEASED' && <FileCheck size={12} />}
                    {doc.status === 'REVIEW' && <FileClock size={12} />}
                    {doc.status === 'DRAFT' && <PenTool size={12} />}
                    {doc.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-slate-500">{doc.version}</td>
                <td className="py-4 px-6 text-sm text-slate-500">{doc.lastModified}</td>
                <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical size={16} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Document Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Document</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
                        <input 
                            autoFocus
                            value={newDocTitle}
                            onChange={(e) => setNewDocTitle(e.target.value)}
                            placeholder="e.g., Software Development Lifecycle"
                            className="w-full p-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg flex gap-3 items-start">
                        <div className="mt-1"><PenTool size={16} className="text-blue-600"/></div>
                        <div>
                            <p className="text-sm font-medium text-blue-900">AI Draft Generation</p>
                            <p className="text-xs text-blue-700">We will use Gemini AI to generate an initial structure and content based on the title.</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button 
                        onClick={() => setShowNewModal(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleCreateDraft}
                        disabled={isGenerating || !newDocTitle}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 flex items-center gap-2"
                    >
                        {isGenerating && <Loader2 size={16} className="animate-spin" />}
                        {isGenerating ? 'Drafting...' : 'Create & Draft'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;