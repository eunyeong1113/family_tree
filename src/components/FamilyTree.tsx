'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Tree = dynamic(() => import('react-d3-tree').then(mod => mod.Tree), {
  ssr: false,
});

export default function FamilyTree() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    fetch('/data/family_tree_complete.json')
      .then((res) => res.json())
      .then((data) => setTreeData(data));
  }, []);

  if (!treeData) return <div>Loading...</div>;

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tree data={treeData} orientation="vertical" pathFunc="step" initialDepth={2} 
      />
    </div>
  )
}
