<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $table ='subscription';

    protected $fillable = [
        'customer_id',
        'product_id',
        'is_approved',
    ];

    public function customer(){
        return $this->belongsTo(Customer::class)->withTrashed();
    }
    public function product(){
        return $this->belongsTo(Product::class)->withTrashed();
    }
}
