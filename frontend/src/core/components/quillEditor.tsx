import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface QuillEditorProps {
  label: string;
  value: string;
  onChange: (content: string) => void;
  error?: boolean;
  helperText?: string;
}

export default function QuillEditor({ label, value, onChange, error, helperText }: QuillEditorProps) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label className="text-sm font-semibold text-blue-900">{label}</label>
      <div className={`rounded-lg ${error ? 'border-red-500' : 'border border-slate-200'}`}>
        <ReactQuill 
          theme="snow"
          value={value || ""} 
          onChange={onChange} 
          className="bg-white h-60"
        />
      </div>
      {helperText && <span className="text-xs text-red-500 font-medium mt-1">{helperText}</span>}
    </div>
  );
}