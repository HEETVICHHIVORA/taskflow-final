#include<iostream>
using namespace std;
int n,m;
inline bool validator(int i,int j){
    return (0<=i && i<n && j>=0 &&j<m);
}
int main (){
    int t ;
    cin>>t;
    int dx[]={-1,0,1,0};
    int dy[]={0,-1,0,1};
    while(t--){
        
        cin>>n>>m;
        int a[n][m];

        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                cin>>a[i][j]; 
            }
        }
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                int maxi =0 ;
                for(int p=0;p<4;p++){
                    int ci = i+dx[p],cj=j+dy[p];
                    if(validator(ci,cj)){
                       maxi =  max(maxi,a[ci][cj]);
                    }
                }
                a[i][j] = min (a[i][j],maxi);
            }
        }
         for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                cout<<a[i][j]<<" "; 
            }
            cout<<endl;
        }

    }
}