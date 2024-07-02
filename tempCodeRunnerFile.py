input1_data = (3,1,1,1,1,1,1,2,1,1,1,0,1,2,1,1,1,1,2,1,5,1,1,7)
input1_data_as_numpy_array = np.asarray(input1_data)
input1_data_reshape = input1_data_as_numpy_array.reshape(1,-1)
prediction = model.predict(input1_data_reshape)