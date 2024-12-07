
#pragma once

#include <vector>

/**
 * DataPool
 *
 * simple and fast contiguous/aligned memory pool of objects
 */
template<typename T>
class DataPool
{
private:
	struct InternalData
		: public T
	{
	public:
		unsigned int _index;
	};

private:
	std::vector<InternalData> _dataPool;
	std::vector<int> _dataUnused;

public:
	DataPool(unsigned int poolSize = 128)
	{
		_dataPool.resize(poolSize);
		_dataUnused.reserve(poolSize);
		for (unsigned int ii = 0; ii < poolSize; ++ii)
			_dataUnused.push_back(ii);
	}

	void grow(unsigned int extraSize)
	{
		// make the pool grow here
		unsigned int currSize = _dataPool.size();
		unsigned int nextSize = currSize + extraSize;

		// here a simple resize is enough
		_dataPool.resize(nextSize);

		// here we need to fill it with the newly created indexes
		_dataUnused.reserve(nextSize);
		for (unsigned int ii = currSize; ii < nextSize; ++ii)
			_dataUnused.push_back(ii);
	}

	T* pop()
	{
		if (_dataUnused.empty())
			grow(_dataPool.size() * 2);

		const int index = _dataUnused.back();
		_dataUnused.pop_back();
		InternalData* pData = &_dataPool[index];
		pData->_index = index;
		return pData;
	}

	inline T*	get(unsigned int index)
	{
		return reinterpret_cast<T*>(&_dataPool[index]);
	}

	inline unsigned int	getIndex(T* pTarget) const
	{
		return reinterpret_cast<InternalData*>(pTarget)->_index;
	}

	inline void	release(unsigned int index)
	{
		_dataUnused.push_back(index);
	}
};
