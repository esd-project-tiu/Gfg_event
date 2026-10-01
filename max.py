arr = [3, 4, 5, 10, 18]
largest = arr[0]

for i in arr:
    if i > largest:
        largest = i

print(largest)