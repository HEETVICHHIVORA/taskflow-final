#include<iostream>
using namespace std ;
int main (){
    int t; cin>>t;
    while(t--){
        int i =1 ;
        int k ;
        cin>>k;
        while(k){
            if(i%10!=3 && i%3!=0){
                k--;
            }
            i++;
        }
        cout<<i-1<<endl;

    }
}