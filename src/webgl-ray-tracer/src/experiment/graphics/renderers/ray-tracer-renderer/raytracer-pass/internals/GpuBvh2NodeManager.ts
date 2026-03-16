
// import { GpuDataTexture2d } from './GpuDataTexture2d';
// import { type IShape, type ShapesBvh2TreeNode } from './bvh/bvh2/ShapesBvh2Tree';

// export class GpuBvh2NodeManager {

//   private _gpuDataTexture2d: GpuDataTexture2d;

//   private _allNodes: ShapesBvh2TreeNode[] = [];

//   constructor(gpuDataTexture2d: GpuDataTexture2d) {
//     this._gpuDataTexture2d = gpuDataTexture2d;
//   }

//   syncRootNode(inputRootNode?: ShapesBvh2TreeNode) {

//     this._allNodes.length = 0;

//     if (!inputRootNode) {
//       return;
//     }

//     const _recFunc = (currNode: ShapesBvh2TreeNode) => {

//       this._allNodes.push(currNode);

//       if (currNode._leftNode) {
//         _recFunc(currNode._leftNode);
//       }
//       if (currNode._rightNode) {
//         _recFunc(currNode._rightNode);
//       }

//     };
//     _recFunc(inputRootNode);

//     this._allNodes.sort((a, b) => a._index - b._index);
//   }

//   prepareBuffer() {

//     this._gpuDataTexture2d.clear();

//     for (const currNode of this._allNodes) {

//       let leftType = 0; // empty, do not test
//       let leftIndex = 0; // empty, no index
//       let leftNode: ShapesBvh2TreeNode | IShape | undefined = undefined;
//       if (currNode._leftNode) {
//         leftType = 1; // child node, test and maybe push to the stack
//         leftIndex = currNode._leftNode._index;
//         leftNode = currNode._leftNode;
//       } else if (currNode._leftLeaf) {
//         leftType = 2; // leaf node, test and maybe push to the stack
//         leftIndex = currNode._leftLeaf.shapeIndex;
//         leftNode = currNode._leftLeaf;
//       }

//       this._gpuDataTexture2d.push(
//         leftType + 0.5,
//         leftIndex + 0.5,
//         leftNode?.min[0] ?? -1,
//         leftNode?.min[1] ?? -1,
//       );
//       this._gpuDataTexture2d.push(
//         leftNode?.min[2] ?? -1,
//         leftNode?.max[0] ?? -1,
//         leftNode?.max[1] ?? -1,
//         leftNode?.max[2] ?? -1,
//       );

//       let rightType = 0; // empty, do not test
//       let rightIndex = 0; // empty, no index
//       let rightNode: ShapesBvh2TreeNode | IShape | undefined = undefined;
//       if (currNode._rightNode) {
//         rightType = 1; // child node, test and maybe push to the stack
//         rightIndex = currNode._rightNode._index;
//         rightNode = currNode._rightNode;
//       } else if (currNode._rightLeaf) {
//         rightType = 2; // leaf node, test and maybe push to the stack
//         rightIndex = currNode._rightLeaf.shapeIndex;
//         rightNode = currNode._rightLeaf;
//       }

//       this._gpuDataTexture2d.push(
//         rightType + 0.5,
//         rightIndex + 0.5,
//         rightNode?.min[0] ?? -1,
//         rightNode?.min[1] ?? -1,
//       );
//       this._gpuDataTexture2d.push(
//         rightNode?.min[2] ?? -1,
//         rightNode?.max[0] ?? -1,
//         rightNode?.max[1] ?? -1,
//         rightNode?.max[2] ?? -1,
//       );

//     }

//   }

// }
