#include<stdio.h>

typedef struct process{
    int id;
    int arrival;
    int completion;
    int waiting;
    int burst;
    int turnaroundtime;
}proc;

void findwaitandturn(proc proc[],int n){
    proc[0].waiting=0;

    for(int i=1;i<n;i++){
        proc[i].waiting = (proc[i-1].waiting+proc[i-1].burst+proc[i-1].arrival)-proc[i].arrival;
        }

    for(int i=0;i<n;i++){
        proc[i].turnaroundtime=proc[i].burst+proc[i].waiting;
    }
}

void findavg(proc proc[],int n){
    findwaitandturn(proc,n);

    int totalwait=0;
    int totalturn=0;

    for(int i=0;i<n;i++){
        totalwait+=proc[i].waiting;
        totalturn +=proc[i].turnaroundtime;
    }

    printf("the avg waiting time is : %f", (float)totalwait/n);

}


int main(){
    int n;
    printf("enter number of processes");
    scanf("%d",&n);

    struct process proc[n];

    for(int i=0;i<n;i++){
        proc[i].id=i+1;

        printf("Enter the arrival and burst time for %d",proc[i].id);
        scanf("%d %d",&proc[i].arrival,&proc[i].burst);

    }

    for(int i=0;i<n-1;i++){
        for(int j=0;j<n-i-1;j++){
            if(proc[j].arrival>proc[j+1].arrival){
                struct process temp = proc[j];
                proc[j]=proc[j+1];
                proc[j+1]=temp;

            }
        }
    }


    findavg(proc,n);

    return 0;
}