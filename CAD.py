import warnings
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import chardet

warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

# Detect file encoding
with open('C:/Users/Admin/OneDrive/Documents/NHG 2021-22/Sherry/CAD.csv', 'rb') as f:
    result = chardet.detect(f.read())
# Use detected encoding
dataset = pd.read_csv('C:/Users/Admin/OneDrive/Documents/NHG 2021-22/Sherry/CAD.csv', encoding=result['encoding'])
dataset.head()
dataset.shape
dataset.isnull().sum()
dataset['VET DIAGNOSIS'].value_counts()
X = dataset.drop(columns='VET DIAGNOSIS', axis=1)
Y = dataset['VET DIAGNOSIS']
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=2)
model = LogisticRegression()
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=10000)
model.fit(X_train,Y_train)
X_train_prediction = model.predict(X_train)
training_data_accuracy = accuracy_score(X_train_prediction, Y_train)
print("Accuracy on training data : ",training_data_accuracy)
X_test_prediction = model.predict(X_test)
test_data_accuracy = accuracy_score(X_test_prediction, Y_test)
print("Accuracy on test data : ",test_data_accuracy)
input_data=(29,8,2,3,2,1,1,2,1,1,1,1,2,2,1,2,1,3,1,1,1,3,1,1)
input_data_as_numpy_array = np.asarray(input_data)
input_data_reshape = input_data_as_numpy_array.reshape(1,-1)
prediction = model.predict(input_data_reshape)
#print(prediction)

if (prediction[0]==0):
    print("The dog has a low risk of aquiring Canine Atopic Dermatitis")
else:
    print("The dog has a high risk of aquiring Canine Atopic Dermatitis")
