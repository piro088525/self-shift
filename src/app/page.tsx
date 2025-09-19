import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Self Shift</h1>
        <p className="text-xl text-gray-600 mb-8">自分の成長を記録する日記アプリ</p>
        <div className="space-y-4">
          <Link
            href="/diary"
            className="block w-64 mx-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            日記を見る
          </Link>
          <Link
            href="/diary/new"
            className="block w-64 mx-auto bg-white text-blue-600 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium border-2 border-blue-600"
          >
            新しい日記を書く
          </Link>
        </div>
      </div>
    </div>
  );
}